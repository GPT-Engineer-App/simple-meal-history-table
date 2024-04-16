import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [mealHistory, setMealHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMealHistory = async () => {
      try {
        const response = await fetch("/api/meal-history");
        const data = await response.json();
        setMealHistory(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meal history:", error);
        setIsLoading(false);
      }
    };

    fetchMealHistory();
  }, []);

  return (
    <Box maxWidth="800px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Personal Meal History
      </Heading>
      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Meal Type</Th>
              <Th>Description</Th>
              <Th>Calories</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mealHistory.map((meal) => (
              <Tr key={meal.id}>
                <Td>{meal.date}</Td>
                <Td>{meal.mealType}</Td>
                <Td>{meal.description}</Td>
                <Td>{meal.calories}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Index;
