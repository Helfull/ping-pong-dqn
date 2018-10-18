
class QLearning
{
    constructor(model) {
        this.model = model
        this.y = 0.95
        this.eps = 0.5
        this.decay_factor = 0.999
        this.action = undefined
        this.state = undefined
        this.choose_type = {}
        this.iteration = 0
    }

    chooseAction(state, actions) {
        this.iteration++;
        this.eps *= this.decay_factor
        if (Math.random() < this.eps) {
            console.log("random")
            this.choose_type[Date.now()] = "random"
            this.action = this.randInt(0, 2)
        } else {
            console.log("predict")
            this.choose_type[Date.now()] = "predict"
            this.action = tf.argMax(this.model.predict(state), 1).dataSync()
        }

        this.state = state
        return this.action
    }

    async gatherReward(r, new_s) {
        if (this.state) {
            console.log("TRAINING")
            const q = tf.argMax(this.model.predict(new_s), 1).dataSync();
            console.log({
                q,
                r,
                y: this.y,
                eps: this.eps,
            })
            const target = r + this.y * q
            const target_vec = this.model.predict(this.state).dataSync()
            target_vec[this.action] = target
            console.log({target, r, target_vec, target_action: target_vec[this.action], action: this.action})
            await this.model.fit(this.state, target_vec)
        }
    }

    randInt(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}
