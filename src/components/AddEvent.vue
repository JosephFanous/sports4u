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
        <p v-if="errors.eventName" class="help is-danger">{{ errors.eventName }}</p>
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
              <option>Hockey</option>
              <option>Baseball</option>
              <option>FootBall</option>
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
      <p v-if="errors.general" class="is-block has-text-danger">{{ errors.general }}</p>
    </section>
    <footer class="modal-card-foot">
      <button
        v-on:click="handleCreate"
        class="button is-success"
        v-bind:class="{ 'is-loading': isLoading }"
      >
        Create Event
      </button>
      <button v-on:click="$emit('close')" class="button">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import { todayInputValue, addEvent } from '../util'
import { isValidDate } from '../../common/util'

export default {
  name: 'AddEvent',
  data: function() {
    return {
      eventName: '',
      sport: 'Basketball',
      startDate: todayInputValue() + 'T12:00',
      endDate: todayInputValue() + 'T13:00',
      isLoading: false,
      errors: {
        general: '',
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
      if (errors) {
        this.errors = errors
        return
      }

      const requestBody = {
        locationID: this.venueID,
        eventName: this.eventName,
        sport: this.sport,
        startDate: this.startDate,
        endDate: this.endDate,
      }

      this.isLoading = true
      addEvent(requestBody).then(data => {
        if (data.errors) return this.errors = data.errors

        // create a new object since VenuePage expects events to be
        // in this format
        const addedEvent = {
          EventID: data.addedEventID,
          Name: this.eventName,
          SportName: this.sport,
          StartTime: this.startDate,
          EndTime: this.endDate,
          EventAddedTime: new Date()
        }

        // emit eventAdded event so that the parent can update it's view
        // with the new event (i.e. VenuePage can add it to its event list)
        this.$emit('eventAdded', addedEvent)
      }).catch(err => {
        console.error(err)
        this.errors = {
          general: 'Could not create event.'
        }
      }).finally(() => {
        this.isLoading = false
      })
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

      if (!errors.startDate && !errors.endDate) {
        const a = new Date(this.startDate)
        const b = new Date(this.endDate)
        if (b <= a) {
          errors.endDate = 'Please enter an end date after the start date.'
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

.modal-card-body > p {
  margin: 0;
}
</style>

