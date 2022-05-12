const SHA256 = require("crypto-js/sha256"); //her bloğun karmasını hesaplamak için içe aktarılan modül


//sınıf oluşturuyoruz
class BlockCrypto {
  constructor(index, current_time, info, nextHash = " ") {
    this.index = index; //buraya kaydediliyor tüm işlemler
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash; //bir sonraki blogun hashı
    this.hash = this.computeHash(); //bir sonraki hashı hesaplamak için
     }

  computeHash() {
    return SHA256(
      this.index +
        this.nextHash +
        this.current_time +
        JSON.stringify(this.info)
          ).toString();
  }
}

class Blockchain {
  constructor() {
    this.block1chain = [this.initGenesisBlock()]; 
    this.difficulty = 5;
  }
  initGenesisBlock() {//ağda oluşturulan ilk blok
    return new BlockCrypto(0, "02.02.2022", "Agimizdaki ilk blok", "0");
  }

  obtainLatestBlock() {  //son blok
    return this.block1chain[this.block1chain.length - 1];
  }
  addNewBlock(newBlock) {  //yeni blok ekleme
    newBlock.nextHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
        this.block1chain.push(newBlock);
  }

  checkChainValidity() {

    //degerler kontrol ediliyor
    for (let i = 1; i < this.block1chain.length; i++) {
      const currentBlock = this.block1chain[i];
      const nextHash = this.block1chain[i - 1];

//oluşturulan blok kontrol ediliyor
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      // oluşturulan blok diğer blokla karşılaştırılıyor.
      if (currentBlock.nextHash !== nextHash.hash) return false;
    }
    return true;
  }
}

let thecoin = new Blockchain();


thecoin.addNewBlock(
  new BlockCrypto(1, "02.02.2022", {
    sender: "Meltem Ergul",
    recipient: "Aysu Atıcıoglu",
    quantity: 20
  })
);

thecoin.addNewBlock(
  new BlockCrypto(2, "12.03.2022", {
    sender: "Zeynep Basaran",
    recipient: "Yunus Emre",
    quantity: 349
  })
);

thecoin.addNewBlock(
  new BlockCrypto(3, "22.04.2022", {
    sender: "Betül Altun",
    recipient: "Esra Çapa",
    quantity: 505
  })
);

console.log(JSON.stringify(thecoin, null, 5));


