import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/posts/post.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  form: FormGroup;
  @Input() post: any = null;

  constructor(
    private _api: PostService,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      body: new FormControl(),
      userId: new FormControl()
    });
    if (!this.post) return;
    this.form.patchValue(this.post);
  }

  async submit() {
    if (!this.form.valid) return;
    if (this.form.value.id) {
      // update
      await this._api.update(this.form.value);
    } else {
      // create
      const newItem = {...this.form.value};
      delete newItem.id;
      await this._api.create(newItem);
    }
    this._modalCtrl.dismiss();
  }
}
