document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#btn').addEventListener('click', function(){
    let text = document.querySelector('#texto').value;
    plugin(text);
  }) 
  
  async function plugin(text){

    text = text + "Based on the text above, please generate Five open-ended questions."
    
    const response = await fetch("https://api.ai21.com/studio/v1/j2-ultra/complete", {
      headers: {
        "Authorization": "Bearer dY6X9604gkkY5xgDADRUTBMEBoiZEfEI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": text,
        "numResults": 1,
        "maxTokens": 5000,
        "temperature": 0.8,
        "topKReturn": 0,
        "topP":1,
        "countPenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "frequencyPenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "presencePenalty": {
          "scale": 0,
          "applyToNumbers": false,
          "applyToPunctuations": false,
          "applyToStopwords": false,
          "applyToWhitespaces": false,
          "applyToEmojis": false
        },
        "stopSequences":[]
      }),
      method: "POST"
    });
  
    const data = await response.json();
    let generatedText = data.completions[0].data.text;

    generatedText = generatedText.replace(/\?/g, '?<br><br>');;
    
    document.querySelector("#result").innerHTML = generatedText;

    const content = generatedText;

    const options = {
        margin: [10, 10, 10, 10],
        filename: "arquivo(JS-PDF).pdf",
        html2canvas: {scale: 2}, 
        jsPDF: {unit: "mm", format: "a4", oritentation: "portrait"}
    }
    html2pdf().set(options).from(content).save()
    
    return generatedText;
  }

  
  
});
