const LIBRARY_FILE = './library.json'
const fs = require('fs')

// methods
const restore = () => {
    if (fs.existsSync(LIBRARY_FILE)) {
        const data = fs.readFileSync(LIBRARY_FILE).toString()
        return JSON.parse(data)
    } else {
        return null
    }
}


const persist_ = model => {
  const encoded = JSON.stringify(model);
  // at this point, `body` has the entire request body stored in it as a string
  fs.writeFileSync(LIBRARY_FILE, JSON.stringify(encoded, null, 4))
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const persist = debounce(persist_, 1000)

module.exports = {persist, restore}
