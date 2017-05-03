import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'member'
})
export class Member implements PipeTransform {

  transform(value: number | string, ...args): string {
    if(value === '') 
    		return '';
    if(value==0)
			return "未指定";
	if(value==1)
		return "临时普通用户";
	if(value==2)
		return "普通会员用户";
	if(value==3)
		return "高级会员用户";
	if(value==4)
		return "待定";
	if(value==5)
		return "测试用户";
  }

}

@Pipe({
  name: 'fname'
})
export class Fname implements PipeTransform {

  transform(value: string, ...args): string {
    if(value === '') 
    		return '';
    var names = value.split(";");
    var keywords = '';
    for(var i in names){
    	keywords+= names[i] + ' ';
    }
    return keywords;
  }

}

@Pipe({
  name: 'type'
})
export class Type implements PipeTransform {

  transform(value: string, ...args): string {
    if(value === '') 
      return '';
    if(value == 'PAPER' || value == 'paper')
      return 'assets/img/paper_1.png'
    if(value == 'PROJECT'  || value == 'project')
      return 'assets/img/project_1.png'
    if(value == 'PATENT' || value == 'patent')
      return 'assets/img/patent_1.png'
    if(value == 'EXPERT' || value == 'expert')
      return 'assets/img/expert_1.png'

    // if(value == 'PAPER' || value == 'paper')
    //   return '论文'
    // if(value == 'PROJECT'  || value == 'project')
    //   return '项目'
    // if(value == 'PATENT' || value == 'patent')
    //   return '专利'
    // if(value == 'EXPERT' || value == 'expert')
    //   return '人才'
  }

}

