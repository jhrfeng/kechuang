export let REQUEST_URL =  "http://mportal.hdu.edu.cn";//'http://202.107.204.57'; //

export let REQUEST_URL_DETAIL = REQUEST_URL + "/#/search/";

export function menuData(): any {
    return {
			tech: [{
				id: "1",
				selected: false,
				code: "",
				name: "不限"
			}, {
				id: "2",
				selected: false,
				code: "xxkj",
				name: "信息科技"
			}, {
				id: "3",
				selected: false,
				code: "jckx",
				name: "基础科学"
			}, {
				id: "4",
				selected: false,
				code: "hxhg",
				name: "化学化工"
			}, {
				id: "5",
				selected: false,
				code: "yjky",
				name: "治金矿业"
			}, {
				id: "6",
				selected: false,
				code: "jxzz",
				name: "机械制造"
			}, {
				id: "7",
				selected: false,
				code: "jtny",
				name: "交通能源"
			}, {
				id: "8",
				selected: false,
				code: "nykj",
				name: "农业科技"
			}, {
				id: "9",
				selected: false,
				code: "swzy",
				name: "生物制药"
			}],
			year: [{
				id: "10",
				selected: false,
				code: "-1",
				name: "不限"
			}, {
				id: "11",
				selected: false,
				code: "3",
				name: "近三年"
			}, {
				id: "12",
				selected: false,
				code: "5",
				name: "近五年"
			}, {
				id: "13",
				selected: false,
				code: "10",
				name: "近十年"
			}],
			area: [{
				id: "14",
				selected: false,
				code: "",
				name: "不限"
			}, {
				id: "15",
				selected: false,
				code: "33",
				name: "浙江"
			}, {
				id: "16",
				selected: false,
				code: "32",
				name: "江苏"
			}, {
				id: "17",
				selected: false,
				code: "31",
				name: "上海"
			}, {
				id: "18",
				selected: false,
				code: "0",
				name: "其他地区"
			}],
			sort: [{
				id: "19",
				selected: true,
				code: false,
				name: "相关度"
			}, {
				id: "20",
				selected: false,
				code: true,
				name: "时间降序"
			}]
		}	
}
