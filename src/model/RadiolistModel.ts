export class RadiolistModel {

  constructor(public items: any){
    this.items = items;
  }

  addItem(index, item): void {
    this.items[index] = item.code;
    item.selected = true;
  }

  removeItem(data): void {
    for(var i in data){
      data[i].selected = false;
    }
  }

  resetItem(items): void{
    this.items = items;
  }

  toggleItemTech(data, item): void {
    this.removeItem(data); // 清空选中
    this.addItem('subject', item);
  }
  toggleItemYear(data, item): void {
    this.removeItem(data); // 清空选中
    this.addItem('time', item);
  }
  toggleItemArea(data, item): void {
    this.removeItem(data); // 清空选中
    this.addItem('area', item);
  }
  toggleItemSort(data, item): void {
    this.removeItem(data); // 清空选中
    this.addItem('yeardesc', item);
  }    

}