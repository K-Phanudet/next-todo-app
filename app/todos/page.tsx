'use client';

import { useState, useEffect, useRef } from 'react';

import { Card, Modal, Input, Button, PageHeader } from "@/app/components"
import { useTodos } from "../hooks/useTodos"
import { useAuth } from "@/app/hooks/useAuth"

export interface Todo {
  id: string,
  description: string,
  title: string,
  createdAt?: Date,
  createdBy?: string,
  updatedAt?: Date
}

type ModalMode = 'create' | 'update';

export default function TodosPage() {
  const {
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo
  } = useTodos();

  const { logout } = useAuth()

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);


  useEffect(() => {
    if (isModalOpen && selectedTodo && modalMode === 'update') {
      if (titleRef.current) {
        titleRef.current.value = selectedTodo.title;
      }
      if (descriptionRef.current) {
        descriptionRef.current.value = selectedTodo.description;
      }
    } else if (isModalOpen && modalMode === 'create') {
      if (titleRef.current) {
        titleRef.current.value = '';
      }
      if (descriptionRef.current) {
        descriptionRef.current.value = '';
      }
    }
  }, [isModalOpen, selectedTodo, modalMode]);

  const handleOpenModalUpdateTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalMode('update')
    setIsModalOpen(true);
    setTitleError(null);
    setDescriptionError(null);
  };

  const handleOpenModalCreateTodo = () => {
    setModalMode('create')
    setIsModalOpen(true)
    setTitleError(null);
    setDescriptionError(null);
  }

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(false);
  };

  const handleCreateTodo = async () => {
    if (!titleRef.current?.value) {
      setTitleError('Title is required');
    } else {
      setTitleError(null);
    }
    if (!descriptionRef.current?.value) {
      setDescriptionError('Description is required');
    } else {
      setDescriptionError(null);
    }
    if (!descriptionRef.current?.value || !titleRef.current?.value) {
      return
    }

    await handleAddTodo({ title: titleRef?.current?.value, description: descriptionRef?.current?.value })
    setIsModalOpen(false)

  }

  const updateTodoHandler = async () => {
    if (!titleRef.current?.value) {
      setTitleError('Title is required');
    } else {
      setTitleError(null);
    }
    if (!descriptionRef.current?.value) {
      setDescriptionError('Description is required');
    } else {
      setDescriptionError(null);
    }
    if (!descriptionRef.current?.value || !titleRef.current?.value) {
      return
    }

    if (selectedTodo?.id) {
      await handleUpdateTodo({ id: selectedTodo?.id, title: titleRef?.current?.value, description: descriptionRef?.current?.value })
    }
    setIsModalOpen(false)
  }

  return (
    <div className='w-full'>
      <PageHeader
        title="Todo list"
        buttonText="Add+"
        onButtonClick={handleOpenModalCreateTodo}
        secondButtonText='Logout'
        onSecondButtonClick={() => logout()}
      />
      <div>
      </div>
      <div className="flex flex-wrap gap-4 justify-start py-4 px-4 sm:px-6 lg:px-8 bg-white h-full">
        {todos.map(todo => (
          <Card
            className={`todo-card-${todo.id} mb-1 mt-1`}
            key={`todo-card-${todo.id}`}
            contentProps={{
              title: todo.title,
              description: todo.description,
              titleClassName: "text-red-500",
              descriptionClassName: "text-blue-500"
            }}
            actionsProps={{
              buttons: [
                {
                  buttonText: 'Edit',
                  buttonProps: {
                    onClick: () => handleOpenModalUpdateTodo(todo),
                    className: "rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-blue-500",
                    'data-testid':'edit-todo-button'
                  },
                },
                {
                  buttonText: 'Delete',
                  buttonProps: {
                    onClick: () => handleDeleteTodo(todo.id),
                    className: "rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-red-500",
                    'data-testid':'delete-todo-button'
                  },
                },
              ],
            }} />
        ))}

      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalMode === "create" ? "Add new todo" : "Update todo"}>
        <div>
          <Input
            label="Title"
            type="text"
            data-testid="input-title-box"
            ref={titleRef}
            errorMessage={titleError || ''}
          />
          <Input
            label="Description"
            type="textarea"
            data-testid="input-desc-box"
            ref={descriptionRef}
            errorMessage={descriptionError || ''}
          />
          <Button
            data-testid='primary-cta-modal'
            onClick={modalMode === "create" ? handleCreateTodo : updateTodoHandler}
            className="rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {modalMode === "create" ? "Create" : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
