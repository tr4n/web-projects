const character = {
    getChar(char, delta) {
        return String.fromCharCode(char.charCodeAt(0) + delta);
    },

    getDelta(firstChar, secondChar) {
        return (firstChar.charCodeAt(0) - secondChar.charCodeAt(0));
    }
}



module.exports = {
    character
}