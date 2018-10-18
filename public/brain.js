class Brain
{
    constructor(featureCount=8, actionCount=3) {
        this.feature_count = featureCount
        this.label_count = actionCount
        this.model = this.buildModel()
        this.qlearning = new QLearning(this)
        this.r_sum = 0
    }

    buildModel() {
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 256, inputShape: [this.feature_count]}));
        model.add(tf.layers.dense({units: 512, inputShape: [256]}));
        model.add(tf.layers.dense({units: this.label_count, inputShape: [512]}));
        model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
        return model
    }

    see(observation, actions) {
        return this.qlearning.chooseAction(observation, actions) - 1;
    }

    predict(observation) {
        return this.model.predict(tf.tensor2d(observation, [1, this.feature_count]));
    }

    async learn(reward, state) {
        await this.qlearning.gatherReward(reward, state)

        this.r_sum += reward
    }

    async fit(state, actions, epochs=1) {

        const xs = tf.tensor2d([state], [1, this.feature_count]);
        const ys = tf.tensor2d(actions, [1, this.label_count]);

        await this.model.fit(xs, ys, {epochs});
    }
}
