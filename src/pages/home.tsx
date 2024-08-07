// pages/home.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  priority: string;
  description?: string;
}

const Home = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrEditAppointment = (e: FormEvent) => {
    e.preventDefault();

    if (isEditing && editingId !== null) {
      setAppointments(appointments.map(appt => 
        appt.id === editingId ? { id: editingId, title, description, date, time, priority } : appt
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newAppointment: Appointment = {
        id: appointments.length + 1,
        title,
        description,
        date,
        time,
        priority
      };
      setAppointments([...appointments, newAppointment]);
    }

    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setPriority('Low');
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
  };

  const handleEditAppointment = (id: number) => {
    const appointment = appointments.find(appt => appt.id === id);
    if (appointment) {
      setTitle(appointment.title);
      setDescription(appointment.description || '');
      setDate(appointment.date);
      setTime(appointment.time);
      setPriority(appointment.priority);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compromissos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Lista de Compromissos</h2>
          <ul>
            {appointments.map(appt => (
              <li key={appt.id} className="mb-2 p-4 border rounded shadow">
                <h3 className="text-lg font-bold">{appt.title}</h3>
                <p>Data: {appt.date}</p>
                <p>Hora: {appt.time}</p>
                <p>Prioridade: {appt.priority}</p>
                <button
                  onClick={() => handleEditAppointment(appt.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteAppointment(appt.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{isEditing ? 'Editar Compromisso' : 'Novo Compromisso'}</h2>
          <form onSubmit={handleAddOrEditAppointment} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Hora
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Prioridade
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Atualizar Compromisso' : 'Adicionar Compromisso'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
