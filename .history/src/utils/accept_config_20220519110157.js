/*
 * @Author: gongnan
 * @Date: 2022-05-19 11:01:38
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-19 11:01:57
 * @Description: file content
 * @FilePath: \front\src\utils\accept_config.js
 */
export const ACCEPT_CONFIG = {
	image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
	video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv'],
	document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
	getAll() {
		return [...this.image, ...this.video, ...this.document]
	},
};
