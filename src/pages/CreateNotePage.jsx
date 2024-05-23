import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNote = async () => {
    await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes", {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
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
      <Button colorScheme="teal" onClick={createNote}>
        Create
      </Button>
    </Box>
  );
};

export default CreateNotePage;