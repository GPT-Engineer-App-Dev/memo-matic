import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const createNote = async () => {
    await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes", {
      method: "POST",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, private: isPrivate }),
    });
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Create Note</Heading>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="content" mb={4}>
        <FormLabel>Content</FormLabel>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </FormControl>
      <FormControl id="private" mb={4}>
        <Checkbox isChecked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>
          Private
        </Checkbox>
      </FormControl>
      <Button colorScheme="teal" onClick={createNote}>
        Create
      </Button>
    </Box>
  );
};

export default CreateNotePage;