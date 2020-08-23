const Number = require('../model/number.js')


module.exports = {
    insert: async function (req, res) {
        try {
            const lists = req.body.lists
            lists.forEach(async (e) => {
                const result = await Number.findOne({
                    num: e
                })
                const numberObject = await getNumer(e)
                if (result) {
                    return res.json({
                        success: false,
                        message: result
                    })
                } else {
                    const newNumber = new Number({
                        num: numberObject.num,
                        class_a: numberObject.class_a,
                        class_b: numberObject.class_b,
                        class_c: numberObject.class_c,
                        class_d: numberObject.class_d,
                        class_e: numberObject.class_e,
                        created_at: Date.now(),
                        updated_at: Date.now(),
                        is_active: false,
                        is_old: false

                    })

                    await newNumber.save()
                }
            })
            return res.json({
                success: true,
                data: 'Success'
            })
        } catch (error) {
            return res.json({
                success: false,
                message: error
            })
        }
    },
    insertOLD: async function (req, res) {
        try {
            const lists = req.body.lists2
            lists.forEach(async (e) => {
                const result = await Number.findOne({
                    num: e
                })
                console.log(result)
                const numberObject = await getNumer(e)

                if (result) {
                    return res.json({
                        success: false,
                        message: result
                    })
                } else {
                    const newNumber = new Number({
                        num: numberObject.num,
                        class_a: numberObject.class_a,
                        class_b: numberObject.class_b,
                        class_c: numberObject.class_c,
                        class_d: numberObject.class_d,
                        class_e: numberObject.class_e,
                        created_at: Date.now(),
                        updated_at: Date.now(),
                        is_active: false,
                        is_old: true
                    })
                    await newNumber.save()
                }
            })
            return res.json({
                success: true,
                data: 'Success'
            })
        } catch (error) {
            return res.json({
                success: false,
                message: error
            })
        }
    },
    getper: async function (req, res) {
        try {
            const total = req.body.total
            const end = req.body.end
            const start = req.body.start
            const allNumber = await Number.find({
                is_active: false,
                num: {
                    $gte: start,
                    $lt: end
                }
            }).count()
            const result = await getOnePer(allNumber)
            res.json(result / total)
        } catch (error) {
            return res.json({
                success: false,
                message: error
            })
        }
    },
    create: async function (req, res) {
        try {
            const result = await Number.findOne({
                num: req.body.num, is_active: false
            })
            console.log(result)
            if (!result) {
                return res.json({
                 mess: "số bạn nhập đã đươc kích hoạt trước đó"
                })
            }
            result.is_active = true
            await result.save()
            return res.json({
                mess: "kích hoạt số thành công",
              
            })
        } catch (error) {
            return res.json({
                success: false,
                message: error
            })
        }
    }
};

function getOnePer(total) {
    return new Promise(async (resolve, reject) => {
        const per = (1 / total) * 100
        resolve(per)
    })
}

function getPer(num) {
    return new Promise(async (resolve, reject) => {

        const numberObject = await getNumer(num)

        const allNumber = await Number.find().count()
        const classA = await Number.find({
            is_active: false,
            is_old: false
        }).distinct('class_a')
        const classB = await Number.find({
            is_active: false,
            is_old: false
        }).distinct('class_b')

        const classC = await Number.find({
            is_active: false,
            is_old: false
        }).distinct('class_c')

        const classD = await Number.find({
            is_active: false,
            is_old: false
        }).distinct('class_d')

        const classE = await Number.find({
            is_active: false,
            is_old: false
        }).distinct('class_e')

    })
}


function getNumer(num) {
    return new Promise(async (resolve, reject) => {
        try {
            const class_a = await getNumberA(num);
            const class_b = await getNumberB(num);
            const class_c = await getNumberC(num);
            const class_d = await getNumberD(num)
            const class_e = Math.ceil((num % 10));
            resolve({
                num: num,
                class_a,
                class_b,
                class_c,
                class_d,
                class_e,
            })
        } catch (error) {
            reject(error)
        }


    })
}

function getNumberD(num) {
    return new Promise((resolve, reject) => {
        try {
            const check = Math.ceil((num % 10))
            if (check === 0)
                resolve(Math.ceil((num % 100) / 10))
            else {
                resolve(Math.ceil((num % 100) / 10) - 1)
            }
        } catch (error) {
            reject(error)
        }

    })
}

function getNumberC(num) {
    return new Promise((resolve, reject) => {
        try {
            const check = Math.ceil((num % 100))
            if (check === 0)
                resolve(Math.ceil((num % 1000) / 100))
            else {
                resolve(Math.ceil((num % 1000) / 100) - 1)
            }
        } catch (error) {
            reject(error)
        }

    })
}

function getNumberB(num) {
    return new Promise((resolve, reject) => {
        try {
            const check = Math.ceil((num % 1000))
            if (check === 0)
                resolve(Math.ceil((num % 10000) / 1000))
            else {
                resolve(Math.ceil((num % 10000) / 1000) - 1)
            }
        } catch (error) {
            reject(error)
        }

    })
}

function getNumberA(num) {
    return new Promise((resolve, reject) => {
        try {
            const check = Math.ceil((num % 10000))
            if (check === 0)
                resolve(Math.ceil((num % 100000) / 10000))
            else {
                resolve(Math.ceil((num % 100000) / 10000) - 1)
            }
        } catch (error) {
            reject(error)
        }

    })
}