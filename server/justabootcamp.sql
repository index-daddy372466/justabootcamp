--
-- PostgreSQL database dump
--

\restrict vxbP6nCYMtDrs1miK56PDEGt5dCiIVfKEZsNpKH5Yby3YgxYN0ZwpgpUZspqU2L

-- Dumped from database version 18.3 (Homebrew)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: newsletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter (
    user_id integer NOT NULL,
    email public.citext NOT NULL,
    status jsonb DEFAULT '{"subscribed": "TRUE", "unsubscribed": "FALSE"}'::jsonb
);


ALTER TABLE public.newsletter OWNER TO postgres;

--
-- Name: newsletter_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_user_id_seq OWNER TO postgres;

--
-- Name: newsletter_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_user_id_seq OWNED BY public.newsletter.user_id;


--
-- Name: newsletter user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter ALTER COLUMN user_id SET DEFAULT nextval('public.newsletter_user_id_seq'::regclass);


--
-- Data for Name: newsletter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter (user_id, email, status) FROM stdin;
\.


--
-- Name: newsletter_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_user_id_seq', 1, false);


--
-- Name: newsletter newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict vxbP6nCYMtDrs1miK56PDEGt5dCiIVfKEZsNpKH5Yby3YgxYN0ZwpgpUZspqU2L

