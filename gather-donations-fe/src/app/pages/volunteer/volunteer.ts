import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface SkillEntry {
  tags: string[];
  selectedTag: string;
  customSkill: string;
  classSize: number;
  teachDays: { [day: string]: boolean };
}

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer.html',
  styleUrls: ['./volunteer.css'],
})
export class Volunteer {
  private http = inject(HttpClient);
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weekdaysKeys = ['isMonday', 'isTuesday', 'isWednesday', 'isThursday', 'isFriday', 'isSaturday', 'isSunday'];
  weekdaysDisplay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  teachDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  teachDaysKeys = ['isMonday', 'isTuesday', 'isWednesday', 'isThursday', 'isFriday', 'isSaturday', 'isSunday'];
  teachDaysDisplay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  formData = {
    name: '',
    contactNo: '',
    email: '',
    preferredContactMethod: 'phone',
    availability: {
      isMonday: true,
      isTuesday: true,
      isWednesday: true,
      isThursday: true,
      isFriday: true,
      isSaturday: false,
      isSunday: false,
    } as { [day: string]: boolean },
  };

  skills: SkillEntry[] = [this.createSkillEntry()];

  createSkillEntry(): SkillEntry {
    return {
      tags: ['Cooking', 'Computer Basics', 'Art & Crafts', 'ESL'],
      selectedTag: '',
      customSkill: '',
      classSize: 20,
      teachDays: {
        isMonday: true,
        isTuesday: false,
        isWednesday: false,
        isThursday: false,
        isFriday: false,
        isSaturday: false,
        isSunday: false,
      },
    };
  }

  selectTag(skillIndex: number, tag: string): void {
    const skill = this.skills[skillIndex];
    skill.selectedTag = skill.selectedTag === tag ? '' : tag;
  }

  addSkill(): void {
    this.skills.push(this.createSkillEntry());
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.splice(index, 1);
    }
  }

  offerToTeach(index: number): void {
    const skill = this.skills[index];
    const skillName = skill.customSkill.trim() || skill.selectedTag;
    if (!skillName) {
      // Show validation message instead of alert
      return;
    }
    const days = Object.entries(skill.teachDays)
      .filter(([, checked]) => checked)
      .map(([day]) => day)
      .join(', ');
    // Log to console.warn instead of console.log
    console.warn(
      `Offering to teach: ${skillName} | Class size: up to ${skill.classSize} | Days: ${days || 'None selected'}`,
    );
    // Show success message instead of alert
  }

  isSubmitted = false;
  submitError = '';
  isSubmitting = false;

  onSubmit(): void {
    this.submitError = '';
    this.isSubmitting = true;

    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.contactNo,
      preferredContact: this.formData.preferredContactMethod,
      availability: Object.entries(this.formData.availability)
        .filter(([, v]) => v)
        .map(([day]) => day),
      skills: this.skills.map(s => ({
        skill: s.customSkill.trim() || s.selectedTag,
        classSize: s.classSize,
        teachDays: Object.entries(s.teachDays)
          .filter(([, v]) => v)
          .map(([k]) => k),
      })),
    };

    this.http.post(`${environment.apiUrl}/donations/volunteer/`, payload).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.isSubmitting = false;
      },
      error: () => {
        this.submitError = 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
