module.exports = {
    devServer: {
        proxy: {
            target: 'http://localhost:8001',
            changeOrigin: true
        }
    }
}