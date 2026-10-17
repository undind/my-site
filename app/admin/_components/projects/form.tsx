"use client";

import { useActionState } from "react";

import { createProjectAction, type CreateProjectState } from "@/app/admin/(home)/projects/create/action";

const initialState: CreateProjectState = {
  success: false,
};

function ProjectForm() {
  const [state, action, pending] = useActionState(createProjectAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title">Titile</label>
        <input id="title" name="title" required maxLength={150} className="block w-full rounded border p-2" />
        {state.errors?.title?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" required className="block w-full rounded border p-2" />
        {state.errors?.slug?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="shortDescription">Short description</label>
        <textarea id="shortDescription" name="shortDescription" required maxLength={300} className="block w-full rounded border p-2" />
      </div>

      <div>
        <label htmlFor="description">Full description</label>
        <textarea id="description" name="description" required className="block w-full rounded border p-2" />
      </div>

      <div>
        <label htmlFor="demoUrl">Demo</label>
        <input id="demoUrl" name="demoUrl" type="url" className="block w-full rounded border p-2" />
      </div>

      <div>
        <label htmlFor="repositoryUrl">GitHub</label>
        <input id="repositoryUrl" name="repositoryUrl" type="url" className="block w-full rounded border p-2" />
      </div>

      {state.message && <p role="alert">{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Создание..." : "Создать проект"}
      </button>
    </form>
  );
}

export default ProjectForm;
