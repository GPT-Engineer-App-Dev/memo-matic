import { useEffect, useState } from "react";
import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TrashPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?is_deleted=eq.true", {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error("Unexpected response format:", data);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const restoreNote = async (id) => {
    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_deleted: false }),
    });
    fetchNotes();
  };

  const permanentlyDeleteNote = async (id) => {
    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
      },
    });
    fetchNotes();
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Trash</Heading>
      <Button as={Link} to="/" colorScheme="teal" mb={4}>
        Back to Notes
      </Button>
      <VStack spacing={4} align="stretch">
        {notes.map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md">{note.title}</Heading>
            <Text mt={2}>{note.content}</Text>
            <Button colorScheme="green" mt={2} onClick={() => restoreNote(note.id)}>
              Restore
            </Button>
            <Button colorScheme="red" mt={2} onClick={() => permanentlyDeleteNote(note.id)}>
              Delete Permanently
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TrashPage;