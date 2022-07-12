module.exports = (size) => {
    const KEYS = 'CVB1NMQ2LZX3WPE4R5DGT6Y7U8IKA9OSF0HJ';
    let code = '';
    for (let i = 0; i < size; i++) {
        code += KEYS.charAt(
            Math.floor(Math.random() * KEYS.length)
        );
    }
    return code;
};
