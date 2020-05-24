/**
 *
 * @constructor
 */
function SumBuff() {
  this.whole_ = [];
  this.decimal_ = [];
  this.comma_ = false;
}

/**
 *
 * @returns {string}
 */
SumBuff.prototype.getDecimal = function () {
  return this.decimal_.join('');
};

/**
 *
 * @returns {string}
 */
SumBuff.prototype.getWhole = function () {
  return this.whole_.join('');
};

/**
 *
 * @returns {boolean}
 */
SumBuff.prototype.isDecimal = function () {
  return this.comma_;
};

/**
 *
 * @param val
 */
SumBuff.prototype.addVal = function (val) {
  if (val === null || !val.match(/[0-9]|\./g)) {
      return;
  }

  switch (val) {
    case '.':
      if (this.whole_.length > 0 && !this.comma_)
        this.comma_ = true;
      break;
    case '0':
      if (this.comma_) {
        if (this.decimal_.length < 2)
          this.decimal_.push(val);
      } else {
        if (this.whole_.length > 0)
          this.whole_.push(val);
      }
      break;
    default:
      if (this.comma_) {
        if (this.decimal_.length < 2)
          this.decimal_.push(val);
      } else {
          this.whole_.push(val);
      }
  }
};

/**
 *
 */
SumBuff.prototype.removeLastVal = function () {
  if (this.comma_) {
    this.comma_ = this.decimal_.length > 0;
    this.decimal_.pop();
  } else {
    if (this.whole_.length > 0)
      this.whole_.pop();
  }
};

/**
 *
 * @param inputEl
 * @param sumBuf
 * @constructor
 */
function Prettifier(inputEl, sumBuf) {
  inputEl.addEventListener('keyup', (e) => {
    if ('Backspace' !== e.key) {
      return;
    }
    sumBuf.removeLastVal();
    e.target.value = sumBuf.isDecimal() ?
      this.prettify(sumBuf.getWhole()) + '.' + sumBuf.getDecimal() : this.prettify(sumBuf.getWhole());
  });

  inputEl.addEventListener('input', (e) => {
    sumBuf.addVal(e.data);
    e.target.value = sumBuf.isDecimal() ?
      this.prettify(sumBuf.getWhole()) + '.' + sumBuf.getDecimal() : this.prettify(sumBuf.getWhole());
  });
}

/**
 *
 * @param val
 * @returns {string|*}
 */
Prettifier.prototype.prettify = function(val) {
  if (val < 1000) {
    return val;
  }

  let tmp = (val/1000).toFixed(3).toString().split('.');
  return this.prettify(Number(tmp[0])) + ' ' + tmp[1];
};