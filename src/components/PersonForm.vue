<template>
    <div id="person-form">
        <form @submit.prevent="addPerson">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Name</label>
                            <input v-model="person.name" type="text" class="form-control"
                                :class="{ 'is-invalid': invalidName }" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Surname</label>
                            <input v-model="person.surname" type="text" class="form-control"
                                :class="{ 'is-invalid': invalidSurname }" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>EMail</label>
                            <input v-model="person.email" type="text" class="form-control"
                                :class="{ 'is-invalid': invalidEmail }" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary"
                                :disabled="invalidEmail || invalidSurname || invalidName">Add person</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Person } from '@/models/person';
import { computed, ref } from 'vue';

// Support variable for input data
let person = ref<Person>({ name: '', surname: '', email: '' });

// support variable for data emissions
const emit = defineEmits(['add-person']);

// Computed variables to handle form status
const invalidName = computed(() => {
    return person.value.name.length < 1;
});

const invalidSurname = computed(() => {
    return person.value.surname.length < 1;
});

const invalidEmail = computed(() => {
    return person.value.email.length < 1;
});

function addPerson() {
    emit('add-person', person.value);
    person.value = {
        name: '',
        surname: '',
        email: '',
    }
}
</script>

<style scoped>
form {
    margin-bottom: 2rem;
}
</style>
