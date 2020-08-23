const num = 72510
console.log(Math.ceil((num%100) /10))
console.log(Math.ceil(num%10))

.find({is_active: false , num:{ $gte: 72900 , $lte: 72999 } }).sort({num: 1}).count()