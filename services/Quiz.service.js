const QuizzesModel = require('@/models/Quiz.model')

class QuizService {
    #model = null

    constructor() {
        this.#model = new QuizzesModel()
    }

    getQuiz() {
        return this.#model.getRandomQuiz()
    }

    checkQuiz(game, userId, answers) {
        const quiz = this.#model.getRandomQuiz()

        const isCorrect = answers.every((value, i) => {
            const { answer } = quiz.list[i]
            return answer === value.trim()
        })

        if (!isCorrect) {
            throw new Error('Wrong answers. Try again later!')
        }

        const user = game.getPlayer(userId)
        user.bonusAnimal(2, 1)
    }
}

module.exports = QuizService
