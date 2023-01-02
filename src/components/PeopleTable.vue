<script setup lang="ts">
import type { IndexablePerson, People } from '@/models/person';
import { ref } from 'vue';

defineProps<{ people: People }>();
const emit = defineEmits(['remove-person', 'update-person']);
const editting = ref<number | null>(null);

let editedPerson: IndexablePerson | null = null;

function editPerson(person: IndexablePerson) {
    editedPerson = { ...person };
    editting.value = person.id;
}

function savePerson(person: IndexablePerson) {
    if (!person.name.length || !person.surname.length || !person.email.length) {
        return;
    }
    emit('update-person', person);
    editting.value = null;
}

function cancelEdition(person: IndexablePerson) {
    Object.assign(person, editedPerson);
    editting.value = null;
}
</script>

<template>
    <div id="people-table">
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>EMail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in people" :key="person.id">
                    <td v-if="editting === person.id">
                        <input type="text" class="form-control" v-model="person.name" />
                    </td>
                    <td v-else>
                        {{ person.name }}
                    </td>

                    <td v-if="editting === person.id">
                        <input type="text" class="form-control" v-model="person.surname" />
                    </td>
                    <td v-else>{{ person.surname }}</td>

                    <td v-if="editting === person.id">
                        <input type="text" class="form-control" v-model="person.email" />
                    </td>
                    <td v-else>{{ person.email }}</td>

                    <td v-if="editting === person.id">
                        <button class="btn btn-success" @click="savePerson(person)">Save</button>
                        <button class="btn btn-secondary ml-2" @click="cancelEdition(person)">Cancel</button>
                    </td>
                    <td v-else>
                        <button class="btn btn-info" @click="editPerson(person)">Edit</button>
                        <button class="btn btn-danger ml-2" @click="emit('remove-person', person.id)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
