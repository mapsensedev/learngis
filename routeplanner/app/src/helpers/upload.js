const input = document.getElementById('file-input');

input.addEventListener('change', (event) => {
  console.log(input.files);

  const reader = new FileReader();

  reader.onload = () => {
    const lines = reader.result.split('\n').map((line) => line.split(','));

    console.log(lines);
  };

  reader.readAsText(input.files[0]);
});

` <button id="input-button" onclick="document.getElementById('file-input').click();">
Browse files
</button>
<input id="file-input" type="file" name="name" style="display: none" />`;
