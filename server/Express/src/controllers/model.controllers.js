const { spawn } = require('child_process');
const { join } = require('path');

module.exports = {
    predict: (req, res) => {
        let output = '';
        const python = spawn(join(__dirname, '../python/venv/Scripts/python'), ['model.py', [1]]);
        python.stdout.on('data', (data) => {
            output = data.toString();
        });
        python.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        res.send(output);
    }
};