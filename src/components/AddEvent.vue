<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Event</p>
      <button v-on:click="$emit('close')" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Event Name</label>
        <div class="control">
          <input
            v-model="eventName"
            class="input"
            v-bind:class="{ 'is-danger': errors.eventName }"
            placeholder="Event Name"
            type="text"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Sport</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth" v-bind:class="{ 'is-danger': errors.sport }">
            <select v-model="sport">
              <option>Basketball</option>
              <option>Table Tennis</option>
              <option>Volleyball</option>
              <option>Badminton</option>
              <option>Soccer</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Start Date</label>
        <div class="control">
          <input
            v-model="startDate"
            class="input"
            v-bind:class="{ 'is-danger': errors.startDate }"
            type="datetime-local"
          >
        </div>
        <p v-if="errors.startDate" class="help is-danger">{{ errors.startDate }}</p>
      </div>
      <div class="field">
        <label class="label">End Date</label>
        <div class="control">
          <input
            v-model="endDate"
            class="input"
            v-bind:class="{ 'is-danger': errors.endDate }"
            type="datetime-local"
          >
        </div>
        <p v-if="errors.endDate" class="help is-danger">{{ errors.endDate }}</p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button v-on:click="handleCreate" class="button is-success">Create Event</button>
      <button v-on:click="$emit('close')" class="button">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import { todayInputValue, isValidDate } from '../util'

export default {
  name: 'AddEvent',
  data: function() {
    return {
      eventName: '',
      sport: 'Basketball',
      startDate: todayInputValue() + 'T12:00',
      endDate: todayInputValue() + 'T13:00',
      errors: {
        eventName: '',
        sport: '',
        startDate: '',
        endDate: '',
      }
    }
  },
  props: ['venueID'],
  methods: {
    handleCreate() {
      // TODO: do form handling
      // TODO: do request here
      // TODO: emit submit event so that parent can close modal and add to list
      this.errors = {}

      const errors = this.getErrors()
      if (!errors) {
        // send request
      } else {
        this.errors = errors
      }

      const eventData = {
        eventName: this.eventName,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      console.log('createEvent:', eventData)
      // console.log(this.startTime)
      // console.log(this.endTime)
      // console.log(this.startDate)
      // console.log(this.endDate)
    },
    getErrors() {
      const errors = {}
      if (!this.eventName) errors.eventName = 'Please enter an event name.'
      if (!this.sport) errors.sport = 'Please enter a sport.'

      if (!this.startDate) {
        errors.startDate = 'Please enter a start date.'
      } else {
        if (!isValidDate(this.startDate)) {
          errors.start = 'Please enter a valid start date.'
        }
      }
      
      if (!this.endDate) {
        errors.endDate = 'Please enter an end date.'
      } else {
        if (!isValidDate(this.endDate)) {
          errors.endDate = 'Please enter a valid end date.'
        }
      }

      if (!Object.keys(errors).length) return null
      else return errors
    }

  }
};
</script>

<style scoped lang="scss">
.error-text {
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.double-input-container {
  margin-bottom: 0.75rem;
}

.double-input {
  flex-direction: row;
  // margin-bottom: 0.75rem;
  .field {
    margin-bottom: 0;
  }
  div {
    flex-grow: 1;
  }
  div:first-child() {
    padding-right: 1rem;
  }
}
</style>

