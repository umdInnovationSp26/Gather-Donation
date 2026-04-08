import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  teachDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  formData = {
    name: '',
    contactNo: '',
    email: '',
    preferredContactMethod: 'phone',
    availability: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false,
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
        Monday: true,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
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

  onSubmit(): void {
    const availability = Object.entries(this.formData.availability)
      .filter(([, checked]) => checked)
      .map(([day]) => day);

    const payload = {
      ...this.formData,
      availability,
      skills: this.skills.map(s => ({
        skill: s.customSkill.trim() || s.selectedTag,
        classSize: s.classSize,
        teachDays: Object.entries(s.teachDays)
          .filter(([, v]) => v)
          .map(([k]) => k),
      })),
    };

    // Log to console.warn instead of console.log
    console.warn('Volunteer form submitted:', payload);
    // Show success message instead of alert
  }
}
