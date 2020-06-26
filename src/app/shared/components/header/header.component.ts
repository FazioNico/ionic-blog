import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostFormComponent } from '../../../components/post-form/post-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: string;
  @Input() action: string;
  @Input() post: any;
  @Output() onAction: EventEmitter<string> = new EventEmitter();

  constructor(
    private _modalCtrl: ModalController
  ) {

  }

  async openModal() {
    // open modal for Edit or Create
    let componentProps = null;
    switch (true) {
      // open modal for create
      case this.action === 'add-outline':
        console.log('create');
        break;
      // open modal for Edit
      case this.action === 'pencil-outline':
        console.log('edit');
        componentProps = {post: this.post};
        break;
      default:
        break;
    }

    const ionModal = await  this._modalCtrl.create({
      component: PostFormComponent,
      componentProps,
    }) // .then(modal => modal.present());
    await ionModal.present();
    await ionModal.onDidDismiss();
    if (this.action === 'pencil-outline') this.onAction.emit('update');
  }
}
