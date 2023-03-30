const path = require('path')

module.exports = {
	sassOptions: {
		fiber: false,
		includePaths: [path.join(__dirname, 'styles')]
	}
}
