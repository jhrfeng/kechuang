export let REQUEST_URL = "http://mportal.hdu.edu.cn";

export function menuData(): any {
    return {
			tech: [{
				id: "1",
				selected: false,
				name: "不限"
			}, {
				id: "2",
				selected: false,
				name: "信息科技"
			}, {
				id: "3",
				selected: false,
				name: "基础科学"
			}, {
				id: "4",
				selected: false,
				name: "化学化工"
			}, {
				id: "5",
				selected: false,
				name: "治金矿业"
			}, {
				id: "6",
				selected: false,
				name: "机械制造"
			}, {
				id: "7",
				selected: false,
				name: "交通能源"
			}, {
				id: "8",
				selected: false,
				name: "农业科技"
			}, {
				id: "9",
				selected: false,
				name: "生物制药"
			}],
			year: [{
				id: "10",
				selected: false,
				name: "不限"
			}, {
				id: "11",
				selected: false,
				name: "近三年"
			}, {
				id: "12",
				selected: false,
				name: "近五年"
			}, {
				id: "13",
				selected: false,
				name: "近十年"
			}],
			area: [{
				id: "14",
				selected: false,
				name: "不限"
			}, {
				id: "15",
				selected: false,
				name: "浙江"
			}, {
				id: "16",
				selected: false,
				name: "江苏"
			}, {
				id: "17",
				selected: false,
				name: "上海"
			}, {
				id: "18",
				selected: false,
				name: "其他地区"
			}],
			sort: [{
				id: "19",
				selected: false,
				name: "相关度"
			}, {
				id: "20",
				selected: false,
				name: "时间降序"
			}]
		}	
}
