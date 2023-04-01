import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/ticket/ticket.service";
import {ITour} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[]; //свойство для хранения данных
  renderComplete = false;

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    //подписка на данные, которые вернет Observable; data - результат, возвращаемый get
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
      }
    )
  }

  ngAfterViewInit() {
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]).then(nav => {console.log(nav);
    }, err => {console.log(err)});
  }

  directiveRenderComplete(ev: boolean){
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #e0ffff')
    this.blockDirective.initStyle(0);
    this.renderComplete = true;
  }

}
