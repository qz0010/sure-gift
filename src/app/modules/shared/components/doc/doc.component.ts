import { Component, OnInit } from '@angular/core';
import {DocService} from '../../services/doc.service';


@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.styl']
})
export class DocComponent implements OnInit {
  constructor(public doc: DocService) { }

  ngOnInit() {
  }
}
