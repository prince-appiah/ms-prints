// module.exports = {
//     // localMongo: 'mongodb://localhost:27017/ms-prints',
//     mongoDbUrl: 'mongodb://ms-prints-admin:admin@ms-prints-shard-00-00-2t1qw.mongodb.net:27017,ms-prints-shard-00-01-2t1qw.mongodb.net:27017,ms-prints-shard-00-02-2t1qw.mongodb.net:27017/ms-prints?ssl=true&replicaSet=ms-prints-shard-0&authSource=admin&retryWrites=true&w=majority'
// }

if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoDbUrl: 'mongodb://ms-prints-admin:admin@ms-prints-shard-00-00-2t1qw.mongodb.net:27017,ms-prints-shard-00-01-2t1qw.mongodb.net:27017,ms-prints-shard-00-02-2t1qw.mongodb.net:27017/ms-prints?ssl=true&replicaSet=ms-prints-shard-0&authSource=admin&retryWrites=true&w=majority'
    }
} else {
    module.exports = {
        mongoDbUrl: 'mongodb://localhost:27017/ms-prints'
    }
}