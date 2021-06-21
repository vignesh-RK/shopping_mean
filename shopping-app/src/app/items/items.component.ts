import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../item_model/items.service';
import { Items } from '../item_model/items.model'
import { Orders } from '../item_model/order.model'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemsService]
})
export class ItemsComponent implements OnInit {
  quantity: number
  constructor(public itemsService: ItemsService) { }
  ngOnInit(): void {
    this.itemlist();
  }
  itemlist() {
    this.itemsService.getitems().subscribe((res) => {
      console.log(res)
      this.itemsService.item = res as Items[];
      this.orderlist();
    })
  }

  orderlist() {
    this.itemsService.getorders().subscribe((res) => {
      console.log(res)

      this.itemsService.orders = res as Orders[];
      for (var i = 0; i < this.itemsService.orders.length; i++) {
        for (var j = 0; j < this.itemsService.item.length; j++) {
          if (this.itemsService.orders[i].itemId === this.itemsService.item[j]._id) {
            this.itemsService.orders[i].itemsName = this.itemsService.item[j].name;
            break;
          }
        }
      }
    })
  }

  saveOrder(a: Items, quantity: number) {
    if (quantity <= a.quentity&& quantity!=0) {
      var order: Orders
      order = new Orders()
      order.itemId = a._id
      order.Quentity = quantity
      order.orderDescription = a.description
      order.totalCost = a.price * quantity
      this.itemsService.saveOrder(order).subscribe((res) => {
        console.log(res)
        order: Orders
        order = res as Orders
        alert("Item bought successfully. Your order id is " + order._id)
        for (var j = 0; j < this.itemsService.item.length; j++) {
          if (order.itemId === this.itemsService.item[j]._id) {
            order.itemsName = this.itemsService.item[j].name;
            break;
          }
        }
        this.itemsService.orders.push(order);
        //  this.orderlist();
        a.quentity = a.quentity - quantity;
        this.itemsService.updateItems(a).subscribe((res) => {

          this.itemlist();
        })
      })

    } else {
      alert("Give within quantity limit ")
    }
    console.log("inside save")
  }

  cancelOrder(order: Orders) {
    this.itemsService.deleteOrder(order).subscribe((res) => {
      alert("Order deleted successfully")
      this.orderlist();
      var item: Items  
      item = new Items()    
      for (var i = 0; i < this.itemsService.item.length; i++) { 
        if (order.itemId === this.itemsService.item[i]._id) {
          item = this.itemsService.item[i];
          break;
        }
      }

      item.quentity = item.quentity + order.Quentity;
      this.itemsService.updateItems(item).subscribe((res) => {

        this.itemlist();
      })

    })
  }

  searchfunction(type:string){
    var input, filter, table, tr, td, i, txtValue;
    
    input = <HTMLInputElement>document.getElementById(type === 'orders' ? "order_search" : "item_search");
    filter = input.value.toUpperCase();
    table = <HTMLInputElement>document.getElementById(type === 'orders' ? "orderTable" : "itemsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  

}
