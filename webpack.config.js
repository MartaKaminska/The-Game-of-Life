const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./js/app.js",
	output: { filename: "out.js", path: path.resolve(__dirname) },
	watch: true,
	devtool: "eval-source-map",
	mode: "development",
	module: {
    	rules: [{
    	    test: /\.js$/,
    	    exclude: /node_modules/,
    	    use: {
    	    	loader: "babel-loader",
    	    	options: {
    	        	presets: ["es2015"]
				}
			}
		}]
	},
	plugins: [
    	new HtmlWebpackPlugin({
    		template: path.resolve(__dirname, "./index.html")
		})
	]
};