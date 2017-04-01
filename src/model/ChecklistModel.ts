export class ChecklistModel {

  constructor(public items: any[]){
    this.items = items;
  }

  addItem(item): void {
    this.items.push(item.id);
    item.selected = true;
  }

  removeItem(item, index): void {
    this.items.splice(index, 1);
    item.selected = false;
  }

  resetItem(): void{
    this.items = [];
  }

  toggleItem(item): void {
    console.log(item);
    let index = this.items.indexOf(item.id);
    if(index > -1)
      this.removeItem(item, index)
    else
      this.addItem(item)
  }    

}