import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.scss']
})
export class InfoTileComponent implements OnInit {

  @Input()
    infoTile = {
      description: 'Completed modules:',
      info: '14'
    }

  constructor() { }

  ngOnInit(): void {
  }

}
