import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { ProfileComponent } from '../profile/profile.component';
import { PaginatePipe, PaginationControlsComponent, PaginationService } from 'ng2-pagination';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
  providers: [ QuestionsService, PaginationService ]
})
export class AllQuestionsComponent implements OnInit {

  @ViewChild('profileModal') profileModal:ProfileComponent;

  private questions;
  private filteredQuestions;
  private questionFilter: any = { tittle: '' };
  private sortType: string = "other";
  private _ItemsPerPage = 5;
  private itemsPerPage;

  constructor(
    private render: Renderer,
    private questionsService: QuestionsService
  ) {
    this.itemsPerPage = this._ItemsPerPage;
    this.questions = questionsService.getQuestions();
    this.filteredQuestions = this.questions;
  }

  showProfile() {
    this.profileModal.showProfile();
  }

  search(event) {
      let toSearch = this.questionFilter.tittle;
      let questions = this.questions.slice();

      if(toSearch != "") {
        this.filteredQuestions = [];
        for(let i = 0; i < questions.length; i++) {
          if (questions[i].tittle.indexOf(toSearch) >= 0) {
            this.filteredQuestions.push(questions[i]);
          } else {
            console.log("Searching phrase does not exist");
          }
        }
      } else {
        console.log("there is no text to search");
        this.filteredQuestions = questions.slice();
      }
  }

  sortBy(event:any, type:string) {
    event.preventDefault();
    let elements = event.target.parentNode.children;

    for (let i = 0; i < elements.length; i++) {
      this.render.setElementClass(elements[i],"active", false);
    }
    this.render.setElementClass(event.target,"active", true);

    if( type == 'hot' ) {
      this.sortType = 'hot';
    } else if ( type == 'recent' ) {
      this.sortType = 'recent';
    } else {
      this.sortType = 'other';
    }
  }

  loadMoreQuestions() {
      this.itemsPerPage = this.itemsPerPage + this._ItemsPerPage;
  }

  ngOnInit() {
  }

}
