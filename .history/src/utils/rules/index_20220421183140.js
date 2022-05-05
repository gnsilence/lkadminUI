/*
 * @Author: gongnan
 * @Date: 2022-02-08 09:31:04
 * @LastEditors: gongnan
 * @LastEditTime: 2022-03-08 14:00:28
 * @Description: file content
 * @FilePath: \scrm_front\src\utils\rules\index.js
 */

export function validaNum(rule, value, callback) {
  if (value) {
    if (/^(?:[1-9]\d*)$/.test(value) === false) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  } else {
    if (rule.fullField === 'Sort') {
      callback(new Error('请输入排序'))
    }
  }
}

export function validaPrice(rule, value, callback) {
  if (value) {
    if (/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(value) === false) {
      callback(new Error('请正确输入'))
    } else {
      callback()
    }
  } else {
    callback(new Error('请正确输入'))
  }
}
export function checkPhoneTel(rule, value, callback) {
 const tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
 const phone = /^1[3456789]\d{9}$/
 if (!tel.test(value) && !phone.test(value) && value) {
   callback(new Error('请正确输入联系方式'))
 } else {
   callback()
 }
}
export function checkInvoiceNo(rule, value, callback) {
 const no = /^\d{8}$/
 if (!no.test(value) && value) {
   callback(new Error('请正确输入发票号'))
 } else {
   callback()
 }
}
