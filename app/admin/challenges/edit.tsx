import { SimpleForm, Edit, TextInput, required, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
        source="question" 
        validate={[required()]} 
        label="Question"
        />
        <SelectInput 
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT"
            },
            {
              id: "ASSIST",
              name: "ASSIST"
            },
          ]}
        />
        <ReferenceInput
          source="unitId"
            reference="units"
        />
        <NumberInput 
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  )
};