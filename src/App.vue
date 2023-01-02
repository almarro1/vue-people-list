<script setup lang="ts">
import { ref } from 'vue';
import PeopleTable from './components/PeopleTable.vue';
import PersonForm from './components/PersonForm.vue';
import type { IndexablePerson } from './models/person';

const people = ref([
  { id: 1, name: 'Jon', surname: 'Snow', email: 'jon@email.com' },
  { id: 2, name: 'Tyrion', surname: 'Lannister', email: 'tyrion@email.com' },
  { id: 3, name: 'Daenerys', surname: 'Targaryen', email: 'daenerys@email.com' },
]);

function addPerson(person: { name: string, surname: string, email: string }) {
  console.log(person)
  let id: number = 0;

  if (people.value.length) {
    id = people.value[people.value.length - 1].id + 1;
  }
  people.value = [...people.value, { ...person, id }];
}

function removePerson(id: number) {
  people.value = people.value.filter((person) => person.id !== id)
}

function updatePerson(person: IndexablePerson) {
  people.value = people.value.map((original: IndexablePerson) => original.id === person.id ? person : original);
}
</script>

<template>
  <div id="container">
    <div class="row">
      <div class="col-md-12">
        <h1>People</h1>
      </div>
    </div>
  </div>
  <div class="row">
    <PersonForm @add-person="addPerson" />
    <div v-if="people.length === 0" class="alert alert-info" role="alert">No people found</div>
    <PeopleTable v-else :people="people" @remove-person="removePerson" @update-person="updatePerson" />
  </div>
</template>

<style >
button {
  background: #009435;
  border: 1px solid #009435;
}
</style>
