module.exports = {
    //打包时不要map文件
    productionSourceMap: false,
    // 关闭eslint
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/bili': {
                target: 'https://www.bilibili.com',//源地址
                changeOrigin: true, //默认true，用于控制请求头中host值（为true就是www.bilibili.com，撒谎了，本来是localhost:8080）
                // ws: false,//是否代理websockets
                pathRewrite: {
                    '^/bili': '' //对象键值对，键是正则表达式
                }
            },
            '/file': {
                target: 'http://localhost',
                changeOrigin: true,
                pathRewrite: {
                    '^/file': ''
                }
            }
            // '/img':{
            //     target: 'http://imgse.com'
            // }
        }
    }
}