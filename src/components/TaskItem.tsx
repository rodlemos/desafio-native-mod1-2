import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import pencilIcon from '../assets/icons/pencil/pencil.png';
import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setEditValue(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, editValue);
    setEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editValue}
            onChangeText={setEditValue}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          >
            {task.title}
          </TextInput>
        </TouchableOpacity>
      </View>

      <View> {
        editing
          ? (<TouchableOpacity>
            <Icon name="x" onPress={handleCancelEditing} />
          </TouchableOpacity>)

          : (<TouchableOpacity onPress={handleStartEditing}>
            <Image source={pencilIcon} />
          </TouchableOpacity>)
      }

        <View style={ styles.iconsDivider }/>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
          disabled={editing}
        >
          <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})
