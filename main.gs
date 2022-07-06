function doGet() {
  this.toggleReveal()
  var output = "<body><p>SUCESSO!</p><script>setTimeout( function() { google.script.host.close(); }, 1000);</script></body>"
  return HtmlService.createHtmlOutput(output);
}

function toggleReveal() {
  var doc = DocumentApp.getActiveDocument()
  var paragraphs = doc.getBody().getParagraphs()
  var highlightStyle = {};
  highlightStyle[DocumentApp.Attribute.BACKGROUND_COLOR] = '#ffffff';
  for(p of paragraphs) {
    var text = p.editAsText();
    var idxs = text.getTextAttributeIndices();
    var offset = 0
    var endOffset = (i + 1 < idxs.length ? idxs[i + 1] : text.getText().length)
    if (endOffset == 0) {
      continue
    }
    for (var i = 0; i < idxs.length; i++) {
      offset = idxs[i]
      endOffset = (i + 1 < idxs.length ? idxs[i + 1] : text.getText().length)
      var isBold = text.isBold(offset)
      if (isBold) {
        currentColor = text.getBackgroundColor(offset)
        if (currentColor == "#ffffff") {
          highlightStyle[DocumentApp.Attribute.BACKGROUND_COLOR] = '#000000';
        } else {
          highlightStyle[DocumentApp.Attribute.BACKGROUND_COLOR] = '#ffffff';
        }
        var endOffsetInclusive = endOffset - 1
        text.setAttributes(offset, endOffsetInclusive, highlightStyle);
      }
    }
  }
}
