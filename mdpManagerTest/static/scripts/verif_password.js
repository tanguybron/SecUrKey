window.onload = function() {
    document.getElementById('username').addEventListener('input',()=> {
        let usrnm = document.getElementById('username').value
        document.getElementById('preview').innerHTML = usrnm
    })
};