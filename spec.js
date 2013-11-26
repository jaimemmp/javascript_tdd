chai.should(); // invoking this function creates a "should" object on every object
context = describe;

lang = 'es';

function Parser(){
  
  this.parseString = function(string){
    var result = string.toUpperCase();
    result = this.singularize(result);
    result = this.replaceChars(result);
    result = this.toArray(result);
    result = this.removeArticles(result);
    return result;
  };

  this.singularize = function(word) {
    if (this.isPluralWord(word)) {
        word = word.slice(0, -1);
    }
    return word;
  };

  this.isPluralWord = function(word) {
    return word.charAt(word.length -1) == 'S';
  };

  this.replaceChars = function(word){
    var result = word;
    var cases = {
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
        "$": "",
        "?": ""
    };
    for (var letter in cases){
        result = result.replace(letter, cases[letter]);
    }
    return result;
  };

  this.removeArticles = function(words){
    var articles = ["LA", "EL", "LOS", "LAS"];
    
    for (var i = 0, len = articles.length; i < len; i++){
      var element = words.indexOf(articles[i]);
      if(element >=0)
        words.splice(element, 1);
    }
    
    return words;
  };

  this.toArray = function(word){
    return word.split(' ');
  };
}


describe("String parser", function(){

    beforeEach(function(){
      parser = new Parser();
    });

    it("converts lowercase string to uppercase", function(){
        var result = parser.parseString("desarrollador");
        expect(['DESARROLLADOR']).toEqual(result);
    });

    it("converts lowercase string to uppercase triangulating", function(){
        var result = parser.parseString('informatico');
        expect(['INFORMATICO']).toEqual(result);
    });

    it("slices the last 's' character from a word", function(){
        var result = parser.parseString('INFORMATICOS');
        expect(['INFORMATICO']).toEqual(result);
    });

    it("replaces any 'tilde' character", function(){
        var result = parser.parseString('INFORMÁTICO');
        expect(['INFORMATICO']).toEqual(result);
    });

    it("replaces any 'tilde' character triangulating" ,function(){
        var result = parser.parseString('CÓDIGO');
        expect(['CODIGO']).toEqual(result);
    });

    it("replaces any 'tilde' character triangulating" ,function(){
        var result = parser.parseString('BARDAJÍ');
        expect(['BARDAJI']).toEqual(result);
    });

    it("replaces any special character" ,function(){
        var result = parser.parseString('$MUNOZ');
        expect(['MUNOZ']).toEqual(result);
    });

    it("replaces any special character, other case" ,function(){
        var result = parser.parseString('?MUNOZ');
        expect(['MUNOZ']).toEqual(result);
    });

    it("divides the string in single words" ,function(){
        var result = parser.parseString('HELLO WORLD');
        expect(['HELLO','WORLD']).toEqual(result);
    });

    it("replaces article 'LA'" ,function(){
        var result = parser.parseString('LA INFO');
        expect(['INFO']).toEqual(result);
    });

    it("replaces more than one article" ,function(){
        var result = parser.parseString('LA INFO EL DATO');
        expect(['INFO', 'DATO']).toEqual(result);
    });
});
