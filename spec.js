chai.should(); // invoking this function creates a "should" object on every object
context = describe;

function Parser(){
  
  this.parseString = function(string){
    var result = string.toUpperCase();
    result = this.singularize(result);
    result = this.replaceTildes(result);
    return [result];
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

  this.replaceTildes = function(word){
    var result = word;
    var cases = {
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U"
    };
    for (var letter in cases){
        result = result.replace(letter, cases[letter]);
    }
    return result;
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

});
